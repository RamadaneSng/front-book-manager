import { AiOutlineDelete } from "react-icons/ai";
import axios from "../../lib/axios";

const Delete = ({ id }) => {
  const handleDelete = async () => {
    await axios.delete("api/book/" + id).then((res) => console.log(res));
  };
  return (
    <div className="delete-icon" onClick={() => handleDelete()}>
      <AiOutlineDelete />
    </div>
  );
};

export default Delete;
