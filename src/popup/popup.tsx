import React from 'react';
import ReactDOM from 'react-dom';
import './popup.css'
import {useState, useEffect} from 'react';
import { Button, Box, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, Checkbox, FormControlLabel, FormGroup, TextField, styled } from '@mui/material'
import { spacing } from "@mui/system"

const CustomeDisabledTextField = styled(TextField)(() => ({
    ".MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000",
      color: "#000"
    },
    ".MuiFormLabel-root.Mui-disabled": {
        WebkitTextFillColor: "#000",
      color: "#000"
    }
  }));


const App: React.FC<{}> = () => {
    // enable shift + click function?
    const [enabled, setEnabled] = useState<boolean>(false);
    // enable inspect card
    const [isInspect, setIsInspect] = useState<boolean>(false);
    const [project, setProject] = useState<string>('');
    const [selectedElement, setSelectedElement] = useState<HTMLElement>(null)

    useEffect(() => {
        chrome.storage.local.get(["currentSelectedElement"], (res) => {
            setSelectedElement(res.currentSelectedElement);
        })
    }, [])

    function enableHighlight(){
        setEnabled(!enabled);
    }

    function openOptionPage(){
        chrome.runtime.openOptionsPage()
    }
    function inspect(){
        setIsInspect(!isInspect);
    }

    function handleChange(event: SelectChangeEvent){
        setProject(event.target.value as string)
    }

    function exportXpathList(){

    }

    function createNew(){

    }

    return(
        <div id="popUpDiv">
            <div id="container">
                <Box my={'16px'}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="project-select-label">Project Name</InputLabel>
                        <Select
                            labelId="project-select-label"
                            id="project-select"
                            value={project}
                            name="project name"
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem key={1} value={'D365.createSalesOrder'}> D365.createSalesOrder </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={'8px'} id="projectActionBox">
                    <Button id='exportButton' variant="outlined" onClick={exportXpathList}>export as...</Button>
                    <Button id='inspectButton' variant="outlined" onClick={inspect}>{isInspect ? 'stop inspection' : 'start inspection'}</Button>
                </Box>
                <Box mt={'8px'} id="createNew">
                    <Button id='createNewButton' variant="outlined" onClick={createNew}>Create New Project</Button>
                </Box>
                <Box my={'16px'}>
                    <CustomeDisabledTextField
                        id="xpathWindow"
                        label="Searched Xpath Window"
                        multiline
                        value={selectedElement ? selectedElement : "If you select the element you wish to get the xpath of from the context menu, this is where you can check the Xpath. You can also enable shift click mode and select the element by shift + click"}
                        variant="standard"
                        disabled
                        fullWidth
                    />
                </Box>
                <Box my={'16px'}>
                    <FormGroup>
                        <FormControlLabel onChange={enableHighlight} control={<Checkbox/>} label={enabled ? 'disable highlight' : 'enable highlight'} />
                    </FormGroup>
                </Box>
                <Box mt={'16px'} mb={'32px'}>
                 <Button id='settingButton' variant="outlined" onClick={openOptionPage}> Go to further settings </Button>
                </Box>
            </div>
        </div>
    )
}
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
