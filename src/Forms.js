import { useState, useEffect } from 'react';

function Form(props) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setUserData({
            //this area is for default values
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('The Form Was Submitted: ' + JSON.stringify(userData));
    }

    const handleChange = (e) => {
        let target = e.target; // the element that initiated the event
        let value = null; // its value
        let name = target.name; // its name
        
        if(target.type === 'checkbox'){
            if(target.checked){
                value = target.checked
            }
            else{
                value = false;
            }
        }
        else if(target.type === "select-multiple"){
            value = [];
            for(let i = 0; i < target.options.length; i++){
                if(target.options[i].selected){
                    value.push(target.options[i].value);
                }
            }
        }
        else{
            value = target.value;
        }


        setUserData(userData => {
            // return a new object built with the properties from userData 
            // including a new property name:value.  If name:value exists, it will be 
            // overwritten, ie: let obj1 = {x:5,x:6}; console.log(obj1); // {x: 6}  
            return {...userData, [name]: value}; 
        });
        //console.log('The Form Was updated, userdata is: ' + JSON.stringify(userData))
    }

    if (!userData) {
        return null; // render nothing until the form data is loaded
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                <input type="text" name="FirstName" value={userData.firstName} onChange={handleChange} />
                <br/>
                <br/>
                Last Name:
                <input type="text" name="LastName" value={userData.lastName} onChange={handleChange} />
                </label>
                
                <br/>   
                <br/>
                <label>Full Program Name:
                    <textarea name="programName" value={userData.programName} onChange={handleChange}></textarea>
                </label>

                <br/>   
                <br/>
                <select multiple={true} name="campus" value={userData.campus} onChange={handleChange}>
                    <option value="">- Select -</option>
                    <option value="king">King</option>
                    <option value="markham">Markham</option>
                    <option value="newnham">Newnham</option>
                    <option value="downtown">Downtown</option>
                </select>
                
                <br/>   
                <br/>
                <label>Enrolled: 
                    <input name="enrolled" type="checkbox" checked={userData.enrolled} onChange={handleChange}></input>
                </label>
                <br/>   
                <br/>
                <label>
                    Residence <input name="housing" type="radio" checked={userData.housing === "residence"} value="residence" onChange={handleChange} />
                </label>
                <label>
                    Off Campus <input name="housing" type="radio" checked={userData.housing === "off campus"} value="off campus" onChange={handleChange} />
                </label>



                <br/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default Form;