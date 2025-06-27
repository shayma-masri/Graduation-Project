//import background from "../../Assets/back-recipe.jpg";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; 

function HomePage() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/RecipeSearch");
  };

  return (
    <>
    <div className="page-content">
      <div className="cont_homepage">
        <div className="overlay"></div>
     
        <div className="text-on-image">
          <h1>Welcome to Snack Track</h1>
          <h2>Your health, your rules</h2>
          <h3>Smart calorie tracking, delicious recipes, and daily motivation — all in one place.</h3>
          <button id="sr_home" onClick={handleSearchClick}>
              <FaSearch />
                   start 
            </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default HomePage;
