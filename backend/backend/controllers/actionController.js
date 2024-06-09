const pool = require('../db');

const getAllActions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const totalRecords = await getTotalRecords();

    const totalPages = Math.ceil(totalRecords / limit);

    const sql = "SELECT * FROM action LIMIT ?, ?";
    const [result] = await pool.query(sql, [offset, parseInt(limit)]);

    res.status(200).json({ totalPages, actionData: result });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getTotalRecords = async () => {
  const [result] = await pool.query("SELECT COUNT(*) as totalRecords FROM action");
  return result[0].totalRecords;
};

const handleSortingAsc = async (req, res) => {
  try {
    const numberOfQueries = req.query.number || 1;
    const type = req.query.type;
    const sortType = req.query.sortType;
    const itemsPerQuery = 60;
    let allResults = [];
    const offset = (numberOfQueries - 1) * itemsPerQuery;
    let orderByClause = '';
    if (type === 'datetime') {
      orderByClause = `ORDER BY STR_TO_DATE(datetime, "%d/%m/%Y %H:%i:%s") ${sortType}`;
    } else {
      orderByClause = `ORDER BY ${type} ${sortType}`;
    }
    const query = `SELECT * FROM action ${orderByClause} LIMIT ${offset}, ${itemsPerQuery}`;
    const [results] = await pool.query(query);
    const chunkedResults = [];
    for (let j = 0; j < results.length; j += 12) {
      const chunk = results.slice(j, j + 12);
      chunkedResults.push(chunk);
    }

    allResults = allResults.concat(chunkedResults);

    res.status(200).json(allResults);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

const handleSortingChosenOne = async (req, res) => {
  try {
    const numberOfQueries = req.query.number || 1;
    const type = req.query.type;
    const action = req.query.action;
    const itemsPerQuery = 60;
    let allResults = [];
    const offset = (numberOfQueries - 1) * itemsPerQuery;
    const query = `SELECT * FROM action WHERE ${type} = ${action} LIMIT ${offset}, ${itemsPerQuery}`;
    const [results] = await pool.query(query);
    const chunkedResults = [];
    for (let j = 0; j < results.length; j += 12) {
      const chunk = results.slice(j, j + 12);
      chunkedResults.push(chunk);
    }

    allResults = allResults.concat(chunkedResults);

    res.status(200).json(allResults);
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

const insertAction = async (req, res) => {
  try {
    const { device, mode, datetime } = req.body;
    const query = 'INSERT INTO action (device, mode, datetime) VALUES (?, ?, ?)';
    const [result] = await pool.query(query, [device, mode, datetime]);
    res.status(201).json({ id: result.insertId, message: 'Record inserted successfully' });
  } catch (error) {
    console.error('Error executing MySQL query:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getAllActions,
  insertAction,
  handleSortingAsc,
  handleSortingChosenOne
};

