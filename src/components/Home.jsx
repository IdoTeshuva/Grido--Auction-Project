import "./home.css"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const Home = ({username, setUsername}) => {
    return (
        <div>
            <h4 className="welcome">Welcome To</h4>
            <h1 className="grido">GRIDO</h1>
            <KeyboardDoubleArrowDownIcon className="down"/>
        </div>
    )
}

export default Home