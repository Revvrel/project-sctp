import styles from "./Table.module.css";

function Table({ list }) {
  return (
    <div>
      {/* <p>{list[0].name}</p> */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Current Status</th>
            <th>Checkin Time</th>
            <th>CheckOut Time</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((item) => (
              <tr key={item.id}>
                <td>{item.userid}</td>
                <td>{item.studentName}</td>
                <td>{item.status}</td>
                <td>{item.checkInTime}</td>
                <td>{item.checkOutTime}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
