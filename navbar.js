function NavBar(){
    const [isNavExpanded, setIsNavExpanded] = React.useState(false) ; 
       return (
        <>
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand"  data-toggle="tooltip" data-placement="bottom" title="Home Page" href="#">BadBank <img src="./images/homeicon.png" width="20" 
                height="20"></img></a>
                <button className="navbar-toggler" type="button" 
                    onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                    }} 
                    data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={isNavExpanded ? "navbar-collapse" : "collapse navbar-collapse"} id="navbarNavDropdown">
                {/* className="collapse navbar-collapse"  */}
                <ul className="navbar-nav">
                    <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Home Page">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Create a New Account">
                        <a className="nav-link" href="#/CreateAccount/">Create Account</a>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Log Into Your Account">
                        <a className="nav-link" href="#/login/">Login</a>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Deposit To Your Account">
                        <a className="nav-link" href="#/deposit/">Deposit</a>
                    </li>
                    <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Withdraw From Your Account">
                        <a className="nav-link" href="#/withdraw/">Withdraw</a>
                    </li>
                    {/* <li className="nav-item">
                    <a className="nav-link" href="#/balance/">Balance</a>
                    </li> */}
                    <li className="nav-item" data-toggle="tooltip" data-placement="bottom" title="View All Transactions">
                        <a className="nav-link" href="#/alldata/">All Data</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        </>
    );
}