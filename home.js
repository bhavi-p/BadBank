function Home(){
    const ctx = React.useContext(UserContext);
    return (
        <Card
            bgcolor="primary"
            txtcolor="white"
            header="BadBank Landing Page"
            title="Welcome to the bank"
            text="You can use this bank! (Default user is Abel)"
            body={(<img src="./images/bank.png" className="img-fluid" alt="Responsive image"/> )}
        />
    );
}