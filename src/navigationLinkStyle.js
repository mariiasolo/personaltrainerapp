export const Style = ({ isActive }) => {
    return {
      textDecoration: 'none', 
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold',
      margin: "10px 10px 1px 2px",
      padding: 10,
      backgroundColor: isActive ? 'beige' : ""
      
    };
  }