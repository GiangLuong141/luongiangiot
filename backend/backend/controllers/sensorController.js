
const pool = require('../db');

const getAllSensors = async (req, res) => {
  try {
    const query = 'SELECT * FROM sensor';
    const [results] = await pool.query(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getTotalRecords = async () => {
  const [result] = await pool.query("SELECT COUNT(*) as totalRecords FROM sensor");
  return result[0].totalRecords;
};

const insertSensor = async (req, res) => {
  try {
    const { temperature, humidity, brightness, datetime } = req.body;
    const query = 'INSERT INTO sensor (temperature, humidity, brightness, datetime) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(query, [temperature, humidity, brightness, datetime]);
    res.status(201).json({ id: result.insertId, message: 'Record inserted successfully' });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};


const searchSensor = async (req, res) => {
  try {
    const { type, keyword } = req.body;

    let sql;
    let params;

    switch (type) {
      case 'temperature':
        sql = 'SELECT * FROM sensor WHERE temperature = ?';
        params = [keyword];
        break;
      case 'humidity':
        sql = 'SELECT * FROM sensor WHERE humidity = ?';
        params = [keyword];
        break;
      case 'brightness':
        sql = 'SELECT * FROM sensor WHERE brightness = ?';
        params = [keyword];
        break;
      default:
        return res.status(400).json({ Message: 'Invalid type. Valid types are temperature, humidity, brightness' });
    }

    const [result] = await pool.query(sql, params);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllSensors,
  insertSensor,
  searchSensor,
};
