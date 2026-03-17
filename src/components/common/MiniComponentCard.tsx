export interface MiniComponentCardInterface {
    title:string;
    description:string
}

const MiniComponentCard: React.FC<MiniComponentCardInterface> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
      <p className="text-large font-semibold mb-2 text-gray-800">{title}</p>
      <p className="text-gray-600 truncate group-hover:whitespace-normal group-hover:overflow-visible hover:text-clip" title={description}>{description}</p>
    </div>
  );
};

export default MiniComponentCard;