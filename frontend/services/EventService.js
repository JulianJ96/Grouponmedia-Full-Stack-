import axios from 'axios'

export default{
    async getEvents() {
        let res = await axios.get("http://localhost:3000/api/auth");
        return res.data;
    },
    async getEventSingle(id){
        let res = await axios.get("http://localhost:5173/api/auth/signin" + id);
        return res.data;
    }
}