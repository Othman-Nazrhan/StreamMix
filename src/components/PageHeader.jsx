import SearchBar from './SearchBar';

// Reusable page header component
const PageHeader = ({ title, description, onSearch }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-gray-400 mb-6">{description}</p>
      {onSearch && <SearchBar onSearch={onSearch} />}
    </div>
  );
};

export default PageHeader;
