function Balance(){
  const [balance, setBalance] = React.useState(0);
  const ctx = React.useContext(UserContext);


  return (
    <Card
      bgcolor="primary"
      txtcolor="white"
      header="Your Account"
      title="Account Balance"
      text="Your balance is:"
      body={(
        <>
          $ {ctx.users[0].balance} <br/>
        </>)}
    />
  );
}