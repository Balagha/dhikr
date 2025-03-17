import {useEffect, useRef, useState} from "react";
import {chrome, favIconUrl, useLocalStorage} from "../Utils";

const TopSites = () => {
    const [topSites, setTopSites] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newShortcut, setNewShortcut] = useState({title: "", url: ""});
    const [customTopSites, setCustomTopSites] = useLocalStorage("customTopSites", []);
    const [editingIndex, setEditingIndex] = useState(null);
    const [menuIndexForCustomShortcut, setMenuIndexForCustomShortcut] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        chrome.topSites.get((sites) => setTopSites(sites.slice(0, 6)));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuIndexForCustomShortcut(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleAddShortcut = (e) => {
        e.preventDefault();

        if (editingIndex !== null) {
            // Update existing shortcut
            const updatedShortcuts = [...customTopSites];
            updatedShortcuts[editingIndex] = newShortcut;
            setCustomTopSites(updatedShortcuts);
        } else {
            // Add new shortcut
            setCustomTopSites([...customTopSites, newShortcut]);
        }

        // Reset form
        setNewShortcut({title: "", url: ""});
        setEditingIndex(null);
        setShowForm(false);
    };


    const handleRemoveShortcut = (index) => {
        const updatedShortcuts = customTopSites.filter((_, i) => i !== index);
        setCustomTopSites(updatedShortcuts);

        // Reset dropdown if the removed item was open
        if (menuIndexForCustomShortcut === index) {
            setMenuIndexForCustomShortcut(null);
        }
    };
    const handleEditCustomShortcut = (index) => {
        const shortcut = customTopSites[index];
        setNewShortcut({title: shortcut.title, url: shortcut.url});
        setEditingIndex(index);  // Track the index being edited
        setShowForm(true);
        setMenuIndexForCustomShortcut(null);
    };
    const shorten = text => text.length > 14 ? text.slice(0, 12) + '...' : text
    return (
        <div className="Shortcuts flex flex-wrap justify-center items-center gap-4 mt-5">
            {/* Display Top Sites with Three-Dot Menu */}
            {topSites?.map((site) => (
                <div key={site.url} className="group flex flex-col justify-center items-center w-[80px] relative">
                    <a href={site.url} className="flex flex-col justify-center items-center">
                        <div
                            className="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center shadow-md">
                            <img src={favIconUrl(site)} alt="icon" className="w-[32px] h-[32px] object-contain"/>
                        </div>
                        <p className="text-[15px] max-w-full text-center overflow-hidden truncate mt-[.3vw]">{shorten(site.title)}</p>
                    </a>
                </div>
            ))}

            {/* Display Custom TopSites */}
            {customTopSites?.map((shortcut, index) => (
                <div key={index} className="group flex flex-col justify-center items-center w-[80px] relative">
                    <a href={shortcut.url} className="flex flex-col justify-center items-center">
                        <div
                            className="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center shadow-md">
                            <img src={favIconUrl(shortcut.url)} alt="icon" className="w-[32px] h-[32px] object-contain"/>
                        </div>
                        <p className="text-[15px] max-w-full text-center overflow-hidden truncate mt-[.3vw]">{shorten(shortcut.title)}</p>
                    </a>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMenuIndexForCustomShortcut(menuIndexForCustomShortcut === index ? null : index);
                        }}
                        className="absolute top-0 right-0 bg-gray-300 text-black w-6 h-6 rounded-full flex justify-center items-center text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        ⋮
                    </button>

                    {menuIndexForCustomShortcut === index && (
                        <div ref={menuRef} className="absolute top-6 right-0 bg-white shadow-md rounded-lg p-2 z-10">
                            <button
                                onClick={() => handleEditCustomShortcut(index)}  // Use new handler
                                className="block px-4 py-1 text-sm hover:bg-gray-200 w-full text-left"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleRemoveShortcut(index)} // Corrected this line
                                className="block px-4 py-1 text-sm hover:bg-gray-200 w-full text-left text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    )}

                </div>
            ))}

            {/* Add Shortcut Button */}
            <button className="flex flex-col justify-center items-center w-[80px]" onClick={() => setShowForm(true)}>
                <div className="w-[60px] h-[60px] bg-gray-300 rounded-full flex justify-center items-center shadow-md">
                    <span className="text-2xl font-bold">+</span>
                </div>
                <p className="text-[12px] text-center mt-2">Add shortcut</p>
            </button>

            {/* Form for Adding/Editing Shortcut */}
            {showForm && (
                <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-white p-5 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold mb-3">{newShortcut.url ? "Edit Shortcut" : "Add Shortcut"}</h3>
                    <form onSubmit={handleAddShortcut} className="flex flex-col gap-2">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newShortcut.title}
                            onChange={(e) => setNewShortcut({...newShortcut, title: e.target.value})}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="url"
                            placeholder="URL"
                            value={newShortcut.url}
                            onChange={(e) => setNewShortcut({...newShortcut, url: e.target.value})}
                            className="border p-2 rounded"
                            required
                        />
                        <div className="flex gap-2">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setNewShortcut({title: "", url: ""});
                                    setEditingIndex(null);  // Reset editing index
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TopSites;