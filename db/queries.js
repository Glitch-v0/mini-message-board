const pool = require("./pool")

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}   

async function createNewMessage(message) {
    console.log({message})
    const query = "INSERT INTO messages (text, username, added) VALUES ($1, $2, $3)";
    const values = [message.text, message.username, new Date()];
    await pool.query(query, values);
}

async function viewMessage(id){
    const result  = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
    return result.rows[0];
}

module.exports = {
    getAllMessages,
    createNewMessage,
    viewMessage
}