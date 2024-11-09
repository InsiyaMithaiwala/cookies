import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

// Define the expected structure of userData
interface UserData {
    userId: string; // Adjust the type of userId if needed (string, number, etc.)
}

export const User = () => {
    const [userData, setUserData] = useState<UserData | null>(null); // Now TypeScript knows userData has the type UserData or null

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user`, {
            withCredentials: true,
        })
            .then(res => {
                setUserData(res.data); // Assuming res.data matches the UserData structure
            })
            .catch(err => {
                console.error('Error fetching user data:', err);
            });
    }, []);

    return <div>
        {userData ? (
            <>You're id is {userData.userId}</> // TypeScript knows userData has userId
        ) : (
            <>Loading...</>
        )}
        <br /><br />
        <button onClick={() => {
            axios.post(`${BACKEND_URL}/logout`, {}, {
                withCredentials: true,
            })
        }}>Logout</button>
    </div>
}
