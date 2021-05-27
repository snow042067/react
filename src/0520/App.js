import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
//import { Button } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green,orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


export default function ButtonAppBar() {
  const classes = useStyles();
  return(
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

const usestyle =makeStyles({
  root: `
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  font-size: 16px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`,
});

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

export default function TypographyTheme() {
  const classes = useStyles();

  return <div className={classes.root}>{"This div's text looks like that of a button."}</div>;
}

function buttonstyle() {
  const classes = useStyles();
  <Typography variant="h4" gutterBottom>
    <Button variant="contained">Default</Button>;
  </Typography>
}

const theme = createMuiTheme({
  status: {
    danger: orange[200],
  },
  palette: {
    ...theme.palette,
    primary: {
      main: green[300],
    }, 
}});

function CheckboxExample(){
  const [checked,setChecked] = React.useState(true);
  return(
    <div>
      <Checkbox 
      checked={checked} 
      onChanged={(e)=>setChecked(e.target.checked)}
      inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <FormControlLabel
        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
        label="Custom icon"/>
    </div>
  )
}

function App() {
  <ThemeProvider theme={theme}></ThemeProvider>
  return (
    <div className="App">
      <header className="App-header">
        <TextFiel  id="filled-Email"  label="Email"  type="Email"  InputLabelProps={{startAdornment: (
          <InputAdornment position="start"> <AccountCircle /> </InputAdornment>),}} InputProps={"someone@gmail.com"} variant="filled"/>
        <ButtonGroup>
          <Button variant="contained" color="primary" size="large" className={classes.button} startIcon={<SaveIcon />} onClick={() => { alert('clicked') }}存檔>   
            Save
          </Button>
          <Button variant="contained" color="default" className={classes.button} startIcon={<CloudUploadIcon />}onClick={() => { alert('clicked') }}上傳>
            Upload
          </Button>
        </ButtonGroup>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
