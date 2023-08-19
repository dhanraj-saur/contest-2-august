import React, { useEffect, useState, useContext } from 'react';
import userApis from '../Apis/userApis';
import authContext from "../context/authContext";
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    let [profile, setProfile] = useState("")

    let { userData, setUserData } = useContext(authContext)

    let navigate = useNavigate()


    useEffect(() => {
        console.log(userData);
        userApis.get(`/users/${userData.id}`)
            .then(response => setProfile(response.data))
            .catch(err => console.log(err))
    }, [])


    function handleLogout() {
        setUserData("")
        setProfile("")
        navigate("/")
    }

    return (

        <div>
            <h1 className='profile'>Profile Page</h1>
            <hr/>


            {
                Object.keys(profile).length > 0 ? (
                    <div>
                        <div className='users'>
                            <h3>Id :- {profile.id}</h3><br />
                            <h3>Genger :- <span> {profile.gender}</span></h3><br />
                            <h3>UserEmail:- <span> {profile.email}</span></h3><br />
                            <h3>UserName:-<span> {profile.username}</span></h3><br />
                            <h3>First Name :- {profile.firstName}</h3><br />
                            <h3>Last Name :-<span> {profile.lastName}</span></h3><br />
                            <img src={profile.image} />
                        </div>
                        <div className='button'>
                            <button id="btn" onClick={handleLogout}> Log Out </button>
                        </div>
                    </div>

                ) : <h1>{ }</h1>
            }

        </div>

    )
}

export default Profile;