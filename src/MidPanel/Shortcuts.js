import {useEffect, useState} from "react";
// import {chrome, favIconUrl, useLocalStorage} from "../Utils";
//
// const Shortcuts = () => {
//     const [topSites, setTopSites] = useState([]);
//     const [showForm, setShowForm] = useState(false);
//     const [newShortcut, setNewShortcut] = useState({ title: "", url: "" });
//     const [customShortcuts, setCustomShortcuts,done] = useLocalStorage('customShortcuts', []);
//
//     useEffect(() => {
//         chrome.topSites.get(sites => setTopSites(sites.slice(0, 5)))
//     }, []);
//
//
//     const handleAddShortcut = (e) => {
//         e.preventDefault();
//         if (newShortcut.title && newShortcut.url) {
//             const updatedShortcuts = [...customShortcuts, newShortcut];
//             setCustomShortcuts(updatedShortcuts);
//
//             // Reset form
//             setShowForm(false);
//             setNewShortcut({ title: "", url: "" });
//         }
//     };
//
//     return (
//         <div className="Shortcuts flex flex-wrap justify-center items-center gap-4 mt-5">
//             {/* Display Top Sites */}
//             {topSites?.map((site) => (
//                 <a key={site.url} className="flex flex-col justify-center items-center w-[80px]" href={site.url}>
//                     <div className="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center shadow-md">
//                         <img
//                             src= {favIconUrl(site)}
//                             alt="icon"
//                             className="w-[32px] h-[32px] object-contain"
//                         />
//                     </div>
//                     <p className="text-[12px] text-center mt-2 truncate w-full">{site.title}</p>
//                 </a>
//             ))}
//
//             {/* Display Custom Shortcuts */}
//             {customShortcuts?.map((shortcut, index) => (
//                 <a key={index} className="flex flex-col justify-center items-center w-[80px]" href={shortcut.url}>
//                     <div className="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center shadow-md">
//                         <img
//                             src= {favIconUrl(shortcut.url)}
//                             alt="icon"
//                             className="w-[32px] h-[32px] object-contain"
//                         />
//                     </div>
//                     <p className="text-[12px] text-center mt-2 truncate w-full">{shortcut.title}</p>
//                 </a>
//             ))}
//
//             {/* Add Shortcut Button */}
//             <button className="flex flex-col justify-center items-center w-[80px]" onClick={() => setShowForm(true)}>
//                 <div className="w-[60px] h-[60px] bg-gray-300 rounded-full flex justify-center items-center shadow-md">
//                     <span className="text-2xl font-bold">+</span>
//                 </div>
//                 <p className="text-[12px] text-center mt-2">Add shortcut</p>
//             </button>
//
//             {/* Form for Adding Shortcut */}
//             {showForm && (
//                 <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-white p-5 rounded-lg shadow-lg">
//                     <h3 className="text-lg font-bold mb-3">Add Shortcut</h3>
//                     <form onSubmit={handleAddShortcut} className="flex flex-col gap-2">
//                         <input
//                             type="text"
//                             placeholder="Title"
//                             value={newShortcut.title}
//                             onChange={(e) => setNewShortcut({ ...newShortcut, title: e.target.value })}
//                             className="border p-2 rounded"
//                             required
//                         />
//                         <input
//                             type="url"
//                             placeholder="URL"
//                             value={newShortcut.url}
//                             onChange={(e) => setNewShortcut({ ...newShortcut, url: e.target.value })}
//                             className="border p-2 rounded"
//                             required
//                         />
//                         <div className="flex gap-2">
//                             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//                                 Save
//                             </button>
//                             <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Shortcuts;


import { chrome, favIconUrl, useLocalStorage } from "../Utils";

const Shortcuts = () => {
    const [topSites, setTopSites] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newShortcut, setNewShortcut] = useState({ title: "", url: "" });
    const [customShortcuts, setCustomShortcuts] = useLocalStorage("customShortcuts", []);

    useEffect(() => {
        chrome.topSites.get((sites) => setTopSites(sites.slice(0, 5)));
    }, []);

    const handleAddShortcut = (e) => {
        e.preventDefault();
        if (newShortcut.title && newShortcut.url) {
            const updatedShortcuts = [...customShortcuts, newShortcut];
            setCustomShortcuts(updatedShortcuts);
            setShowForm(false);
            setNewShortcut({ title: "", url: "" });
        }
    };

    // Remove Shortcut Function
    const handleRemoveShortcut = (index) => {
        const updatedShortcuts = customShortcuts.filter((_, i) => i !== index);
        setCustomShortcuts(updatedShortcuts);
    };

    // Remove Top Site Function
    const handleRemoveTopSite = (index) => {
        const updatedSites = topSites.filter((_, i) => i !== index);
        setTopSites(updatedSites);
    };

    return (
        <div className="Shortcuts flex flex-wrap justify-center items-center gap-4 mt-5">
            {/* Display Top Sites with Remove Button on Hover */}
            {topSites?.map((site, index) => (
                <div key={site.url} className="group flex flex-col justify-center items-center w-[80px] relative">
                    <a href={site.url} className="flex flex-col justify-center items-center">
                        <div className="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center shadow-md">
                            <img src={favIconUrl(site)} alt="icon" className="w-[32px] h-[32px] object-contain" />
                        </div>
                        <p className="text-[12px] text-center mt-2 truncate w-full">{site.title}</p>
                    </a>
                    {/* Remove Icon (Appears on Hover) */}
                    <button
                        onClick={() => handleRemoveTopSite(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full flex justify-center items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        ❌
                    </button>
                </div>
            ))}

            {/* Display Custom Shortcuts with Remove Button on Hover */}
            {customShortcuts?.map((shortcut, index) => (
                <div key={index} className="group flex flex-col justify-center items-center w-[80px] relative">
                    <a href={shortcut.url} className="flex flex-col justify-center items-center">
                        <div className="w-[60px] h-[60px] bg-gray-200 rounded-full flex justify-center items-center shadow-md">
                            <img src={favIconUrl(shortcut.url)} alt="icon" className="w-[32px] h-[32px] object-contain" />
                        </div>
                        <p className="text-[12px] text-center mt-2 truncate w-full">{shortcut.title}</p>
                    </a>
                    {/* Remove Icon (Appears on Hover) */}
                    <button
                        onClick={() => handleRemoveShortcut(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full flex justify-center items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        ❌
                    </button>
                </div>
            ))}

            {/* Add Shortcut Button */}
            <button className="flex flex-col justify-center items-center w-[80px]" onClick={() => setShowForm(true)}>
                <div className="w-[60px] h-[60px] bg-gray-300 rounded-full flex justify-center items-center shadow-md">
                    <span className="text-2xl font-bold">+</span>
                </div>
                <p className="text-[12px] text-center mt-2">Add shortcut</p>
            </button>

            {/* Form for Adding Shortcut */}
            {showForm && (
                <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-white p-5 rounded-lg shadow-lg">
                    <h3 className="text-lg font-bold mb-3">Add Shortcut</h3>
                    <form onSubmit={handleAddShortcut} className="flex flex-col gap-2">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newShortcut.title}
                            onChange={(e) => setNewShortcut({ ...newShortcut, title: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="url"
                            placeholder="URL"
                            value={newShortcut.url}
                            onChange={(e) => setNewShortcut({ ...newShortcut, url: e.target.value })}
                            className="border p-2 rounded"
                            required
                        />
                        <div className="flex gap-2">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Shortcuts;