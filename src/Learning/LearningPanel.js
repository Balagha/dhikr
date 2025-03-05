import Hadith from "./Hadith";
import Quiz from "./Quiz";
import {useLocalStorage} from "../Utils";
import ShortcutTab from "./ShortcutTab/ShortcutTab";

function LearningPanel() {
    const [showHadith, setShowHadith] = useLocalStorage('showHadith', true);
    const toggle = () => setShowHadith(!showHadith);

    return (
        <div>
            <ShortcutTab />
            {showHadith ? <Hadith showQuiz={toggle} /> : <Quiz showHadith={toggle} />}
        </div>
    );

}


export default LearningPanel;
