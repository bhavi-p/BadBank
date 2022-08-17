function Withdraw(){
  const [show, setShow] =         React.useState(true);
  const [status, setStatus] =     React.useState('');
  const [amount, setAmount] =       React.useState(0);
  // const [withdrawals, setWithdrawals] = React.useState([]);
  // const [withdraw, setWithdraw] = React.useState(0);
  const [validTransaction, setValidTransaction] = React.useState(false);
  const ctx = React.useContext(UserContext);

  function handleChange(e) {
    setAmount(e.currentTarget.value);
    if(e.currentTarget.value == 0 || e.currentTarget.value == '') setValidTransaction(false);
    else setValidTransaction(true);
  }

  function validate(balance, field, label){
    let numInput = Number(field);
    if(!Number.isInteger(numInput)) {
        setStatus('Error: Please enter a valid NUMBER withdrawal ' + label + '. No symbols or extra characters');
        setTimeout(() => setStatus(''),3000);
        return false
    }
    if(field > balance) {
      setStatus('Error: Withdrawal ' + label + ' exceeds current balance');
      setTimeout(() => setStatus(''),3000);
      return false
    } else if(field < 0) {
      setStatus('Error: Please enter a valid POSITIVE withdrawal ' + label);
      setTimeout(() => setStatus(''),3000);
      return false
    }
    return true
  }

  function handleWithdraw(){
    
      let index = ctx.users.findIndex(user => {
        return user.current == true;
      });
      
      if (!validate(ctx.users[index].balance, amount, 'amount'))       return;
      console.log('before: ' + JSON.stringify(ctx.users[0].balance));
      console.log('amount: ' + amount);


      let oldBalance = ctx.users[index].balance;
      ctx.users[index].balance -= Number(amount);
      let newBalance = ctx.users[index].balance;

      console.log('new balance: ' + JSON.stringify(ctx.users[index].balance));

      // let transaction = `Withdrew $${amount}. New Balance: $${ctx.users[0].balance}`;
      let transObj = {
        type: 'Withdrawal',
        before: oldBalance,
        amount: amount,
        new: newBalance  
      };
      // add transaction to ctx.users[0].withdraw
      ctx.users[index].transactions.push(transObj);
      console.log(JSON.stringify(transObj));
      console.log(JSON.stringify(ctx.users[index].transactions));
      setShow(false);
  }

  function makeWithdraw(){
    setAmount('');
    setValidTransaction(false);
    setShow(true);
  }

  return (
      <Card
          bgcolor="warning"
          header="Withdraw"
          status={status}
          body={show ? (
                  <>
                  Balance: ${JSON.stringify(ctx.users[ctx.users.findIndex(user => {
        return user.current == true;
      })].balance)}<br/>
                  <input type="text" className="form-control" id="Withdraw" placeholder="Withdraw Amount" value={amount} onChange={handleChange}/><br/>
                  <button type="submit" className="btn btn-light" disabled={!validTransaction} onClick={handleWithdraw}>Withdraw</button>
                  </>
              ):(
                  <>
                  <h5>Withdrawal Successful!</h5>
                  New Balance: ${JSON.stringify(ctx.users[ctx.users.findIndex(user => {
        return user.current == true;
      })].balance)}<br/>
                  <button type="submit" className="btn btn-light" onClick={makeWithdraw}>Make Another Withdrawal</button>
                  </> 
              )}
      
      />
  )
}
  