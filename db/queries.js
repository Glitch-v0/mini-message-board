const pool = require("./pool")

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}   

async function createNewMessage(message) {
    // prevent message from being sent twice
    const checkQuery = "SELECT * FROM messages WHERE text = $1 AND username = $2";
    const checkValues = [message.text, message.username];
    const { rows } = await pool.query(checkQuery, checkValues);
    if (rows.length > 0) {
        console.error('Message sent twice')
        return;
    }
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