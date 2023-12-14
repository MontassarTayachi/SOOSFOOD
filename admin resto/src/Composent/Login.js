import React, { useState } from 'react';
import "../styles/Login.css";
import { useNavigate } from 'react-router-dom';

function Login({onLogin,setData,name}) {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		name: '',
		pass: '',
	  });

	const [formData, setFormData] = useState({
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
    address :"",
    phone_number:"",
	  });
	  const initialFormData = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      address :"",
      phone_number:"",
	  };
	  const resetForm = () => {
		setFormData(initialFormData);
	  };
	
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	  };
	    const handleChange1 = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
	
	  const handleSubmit = async (e) => {
		e.preventDefault();
		// Add your form submission logic here
		// You can access form data using formData.userName, formData.email, etc.
		if (formData.password !== formData.confirmPassword) {
		  alert("Passwords don't match!");
		  // You may want to reset the password fields or handle this case differently
		} else {
      try {
        // Make a POST request to your server's signup endpoint
        const response = await fetch('http://localhost:4000/insert/restaurant', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      
        if (response.ok) {
          const userData = await response.json();
          console.log('User created successfully:', userData);
          
          alert('User created successfully');
          resetForm();
          // You can redirect to another page or update the UI as needed
        } else {
          console.error('Failed to create user');
        }
        } catch (error) {
        console.error('Error:', error);
        }
		 
		}
		
	  };
	  const handleSubmit2 = async (e) => {
		e.preventDefault();
		try {
			
			const response = await fetch(
				`http://localhost:4000/select/restaurant/${encodeURIComponent(loginData.name)}/${encodeURIComponent(loginData.pass)}`
			  );
			  const jsonData = await response.json();
			if (jsonData !==null) {
				setData(jsonData.name,jsonData.id);
				onLogin(); 
			navigate('/');
			
			}
			else{
				alert("Verifier les Cordonner")
			}
		  } catch (err) {
			console.error(err.message);
			alert(err.message)
		  }
		 // Navigate to the home page or another route after successful login
	  };
	
  
	return (
  <div className="ady">
	
	<div className='left'>
	<h1 >Welcome <br/>To SOS Food </h1>
	<p >SOS Food, votre destination en ligne pour une expérience de restauration universitaire sans stress. Découvrez une nouvelle ère de repas sur le campus avec notre plateforme conviviale, offrant une variété de délicieuses options culinaires.<br></br>Parcourez notre vaste sélection de menus, passez des commandes sans effort et profitez de repas savoureux directement sur votre campus.</p>
	</div>
	<div className='right'>
	<div className="main">  	
		    <input type="checkbox" id="chk" aria-hidden="true"/>

			<div className="signup">
				<form className="form">
					<label className="label" for="chk" aria-hidden="true">Sign up</label>
					<input className="input" type="text" name="userName" value={formData.userName} placeholder="Name Restaurant" onChange={handleChange} required=""/>
					<input  className="input" type="email" name="email" value={formData.email} placeholder="Email"  onChange={handleChange} required=""/>
          <input className="input" type="text" name="address" value={formData.address} placeholder="Address" onChange={handleChange} required=""/>
					<input  className="input" type="email" name="phone_number" value={formData.phone_number} placeholder="Phone Number"  onChange={handleChange} required=""/>
					
          <input  className="input" type="password" name="password" value={formData.password} placeholder="Password" onChange={handleChange}  required=""/>
					<input  className="input" type="password" name="confirmPassword"  value={formData.confirmPassword} onChange={handleChange}  placeholder="confirmer Password" required=""/>
                    <button onClick={handleSubmit}>Sign up</button>
				</form>
			</div>

			<div className="login">
				<form className="form2">
					<label className="label" for="chk" aria-hidden="true">Login</label>
					<input  className="input2" onChange={handleChange1} value={loginData.userName} name="name" type="text" placeholder="Your Name" required=""/>
					<input  className="input2" onChange={handleChange1} value={loginData.password} type="password" name="pass" placeholder="Password" required=""/>
					<button onClick={handleSubmit2}>Login</button>
				</form>
			</div>
	</div>
</div>

</div>)}
  export default Login;