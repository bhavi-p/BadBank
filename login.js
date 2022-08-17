function Login(){
  const [show, setShow] =         React.useState(true);
  const [status, setStatus] =     React.useState('');
  const [email, setEmail] =       React.useState('');
  const [password, setPassword] = React.useState('');
  const [current, setCurrent] =   React.useState(false);
  const ctx = React.useContext(UserContext);

  function validate(field, label){
      if(!field) {
          setStatus('Error: Please enter ' + label);
          setTimeout(() => setStatus(''),3000);
          return false
      }
      return true
  }

  function handleLogin(){
      console.log(email,password);
      let login = {email, password};
       
      if (!validate(email, 'email'))       return;
      if (!validate(password, 'password')) return;
      // ctx.users.push({name,email,password,balance:100});
    //   console.log('ctx: ' + JSON.stringify(ctx.users));
      
      // confirm if login creds are in ctx (list of accounts)
      let existsUser = ctx.users.find((login) => (login.email === email && login.password === password))
      
      if(existsUser) {
        let currentUser = ctx.users.indexOf(existsUser);
        ctx.users.forEach((user) => {
          user.current = false;
        })
        ctx.users[currentUser].current = true;
        console.log('login successful: ' + JSON.stringify(ctx.users));
        setShow(false);
      } else {
        clearForm();
        alert('Login email or password not found');
      }

      
  }

  function clearForm(){
      setEmail('');
      setPassword('');
      setShow(true);
  }

  return (
      <Card
          bgcolor="secondary"
          header="Login"
          status={status}
          body={show ? (
                  <>
                  Email address<br/>
                  <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                  Password<br/>
                  <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                  <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
                  </>
              ):(
                  <>
                  <h5>Login Successful!</h5>
                  <h4>Welcome to the Bank, {ctx.users[ctx.users.findIndex(user => {
        return user.current == true;
      })].name}!<br/></h4>
                  {/* <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button> */}
                  </> 
              )}
      
      />
  )
}