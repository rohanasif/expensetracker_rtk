import Expenses from "./components/Expenses";
import Income from "./components/Income";
import AddRemove from "./components/AddRemove";
const App = () => {
  return (
    <div className="main">
      <div className="flex justify-center items-center min-h-screen gap-5">
        <Income />
        <AddRemove />
        <Expenses />
      </div>
    </div>
  );
};
export default App;
