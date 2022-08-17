function CreateAccount(){
    const [show, setShow] =         React.useState(true);
    const [isEmpty, setIsEmpty] =   React.useState(true);
    const [status, setStatus] =     React.useState('');
    const [name, setName] =         React.useState('');
    const [email, setEmail] =       React.useState('');
    const [password, setPassword] = React.useState('');
    const [validTransaction, setValidTransaction] = React.useState(false);
    const ctx = React.useContext(UserContext);

    function handleChange(e) {
        let nameInput = document.getElementById('name').value;
        let emailInput = document.getElementById('email').value;
        let passwordInput = document.getElementById('password').value;
        
        switch(e.currentTarget.id) {
            case 'name':
                setName(e.currentTarget.value);
                break;
            case 'email':
                setEmail(e.currentTarget.value);
                break;
            case 'password':
                setPassword(e.currentTarget.value);
                break;
        }

        if(!nameInput && !emailInput && !passwordInput) {
            setValidTransaction(false);
        } else {
            setValidTransaction(true);
        }

        return;
    }

    function validate(field, label, err){
        if(!field) {
            // setStatus(status + 'Error: ' + label + ' field is missing');
            // setTimeout(() => setStatus(''),3000);
            if(err == '') err = `Error: \r\n`;
            err += `\n * ${label.toUpperCase()} field is missing \r\n`;
            console.log('err: ' + err);
            return err;
        }
        if(label == 'password' && password.length < 8) {
            // setStatus(status + 'Error: ' + label + ' should be 8+ characters');
            // setTimeout(() => setStatus(''),3000);
            if(err == '') err = 'Error: \r\n';
            err += `\n * ${label.toUpperCase()} should be 8+ characters \r\n`;
            return err;
        }
        return err;
    }

    function multiFieldBlank(){
        let errorMsg = '';
        errorMsg = validate(name, 'name', errorMsg);
        errorMsg = validate(email, 'email', errorMsg);
        errorMsg = validate(password, 'password', errorMsg);
        console.log('errorMsg :' + errorMsg);
        setStatus(errorMsg);
        setTimeout(() => setStatus(''),5000);
        if(errorMsg == '') return false;
        else return true;
    }

    function handleCreate(){
        console.log(name,email,password);
        console.log('multiField: ' + multiFieldBlank());
        if(multiFieldBlank()) return;

        ctx.users.forEach((user) => {
            user.current = false;
          })
        ctx.users.push({name,email,password,current:true,balance:100,transactions: []});
        console.log('New account added: ' + JSON.stringify(ctx.users));
        setShow(false);
    }

    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }

// e => setName(e.currentTarget.value)
// e => setEmail(e.currentTarget.value)
// e => setPassword(e.currentTarget.value)

    return (
        <Card
            bgcolor="primary"
            header="Create Account"
            status={status}
            body={show ? (
                    <>
                    Name<br/>
                    <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={handleChange} /><br/>
                    Email address<br/>
                    <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={handleChange}/><br/>
                    Password<br/>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={handleChange}/><br/>
                    <button type="submit" className="btn btn-light" disabled={!validTransaction} onClick={handleCreate}>Create Account</button>
                    </>
                ):(
                    <>
                    <h5>Success</h5>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                    </> 
                )}
        
        />
    )
}