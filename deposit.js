function Deposit(){
  const [show, setShow] =         React.useState(true);
  const [status, setStatus] =     React.useState('');
  const [amount, setAmount] =       React.useState(0);
  const [validTransaction, setValidTransaction] = React.useState(false);
//   const [deposits, setDeposits] = React.useState([]);
  const ctx = React.useContext(UserContext);

  function handleChange(e) {
    setAmount(e.currentTarget.value);
    if(e.currentTarget.value == 0 || e.currentTarget.value == '') setValidTransaction(false);
    else setValidTransaction(true);
  }

  function validate(field, label){
    let numInput = Number(field);
    if(!Number.isInteger(numInput)) {
        setStatus('Error: Please enter a valid NUMBER deposit ' + label + '. No symbols or extra characters');
        setTimeout(() => setStatus(''),3000);
        return false
    }
    if(numInput <= 0) {
        setStatus('Error: Please enter a valid POSITIVE deposit ' + label);
        setTimeout(() => setStatus(''),3000);
        return false
    }
    return true
  }

  function handleDeposit(){
    if (!validate(amount, 'amount'))       return;
    let index = ctx.users.findIndex(user => {
        return user.current == true;
      });

    console.log('index: ' + index);
    let oldBalance = ctx.users[index].balance;
    console.log('amount: ' + amount);
    ctx.users[index].balance += Number(amount);
    let newBalance = ctx.users[index].balance;
    // let transaction = `Old Balance $${oldBalance}. Deposit $${amount}. New Balance: $${ctx.users[0].balance}`;
    let transObj = {
        type: 'Deposit',
        before: oldBalance,
        amount: amount,
        new: newBalance  
    };
    // add transaction to ctx.users[0].deposits
    ctx.users[index].transactions.push(transObj);
    console.log(JSON.stringify(ctx.users[index].transactions));
    setShow(false);
  }

  function makeDeposit(){
    setAmount('');
    setValidTransaction(false);
    setShow(true);
  }

  return (
      <Card
          bgcolor="warning"
          header="Deposit"
          status={status}
          body={show ? (
                  <>
                  Balance: ${JSON.stringify(ctx.users[ctx.users.findIndex(user => {
        return user.current == true;
      })].balance)}<br/>
                  <input type="text" className="form-control" id="deposit" placeholder="Deposit Amount" value={amount} onChange={handleChange}/><br/>
                  <button type="submit" className="btn btn-light" disabled={!validTransaction} onClick={handleDeposit}>Deposit</button>
                  </>
              ):(
                  <>
                  <h5>Deposit Successful</h5>
                  New Balance: ${JSON.stringify(ctx.users[ctx.users.findIndex(user => {
        return user.current == true;
      })].balance)}<br/>
                  <button type="submit" className="btn btn-light" onClick={makeDeposit}>Make Another Deposit</button>
                  </> 
              )}
      
      />
  )
}
  