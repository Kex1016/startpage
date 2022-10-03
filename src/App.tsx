import {useState, useEffect} from 'react';
import {Providers} from './Providers';
import {Container} from './components/Basic/Container';
import {Wrapper} from './components/Basic/Wrapper';
import {H1, H3} from './components/Basic/Heading';
import {Header} from "./components/Basic/Header";
import {Section} from "./components/Basic/Section";
import {Search} from "./components/Search";
import {Bookmarks} from "./components/Bookmarks/Bookmarks";
import {SettingsButton} from "./components/Settings/SettingsButton";
import {SettingsModal} from "./components/Settings/SettingsModal";
import {useStorage} from "@startpage/local-storage";
import {SettingsTemplate} from "./helper/init";


const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
        return `Good morning`;
    }
    if (hour < 18) {
        return `Good afternoon`;
    }
    return `Good evening`;
}

function Clock() {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    return <H3>{time}</H3>;
}

function App() {
    const [editSettings, setEditSettings] = useState(false);
    const [settings] = useStorage("settings", SettingsTemplate);
    const toggleEditSettings = () => {
        setEditSettings(!editSettings);
    }

    return (
        <Providers>
            <Wrapper>
                <Container>
                    <SettingsButton onClick={toggleEditSettings}/>
                    <Header>
                        <H1>{greeting()}, {settings.name}!</H1>
                        <Clock/>
                    </Header>
                    <Section>
                        <Header>
                            <H1>Search</H1>
                            <Search />
                        </Header>
                    </Section>
                    <Section>
                        <Header>
                            <H1>Bookmarks</H1>
                        </Header>
                        <Bookmarks />
                    </Section>
                </Container>
            </Wrapper>
            {editSettings && <SettingsModal onClick={toggleEditSettings}/>}
        </Providers>
    );
}

export default App;
