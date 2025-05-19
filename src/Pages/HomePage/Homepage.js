import background from "../../Assets/back-recipe.jpg";
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
          <h1>Welcome to Recipe Finder!</h1>
          <h3>Explore a world of recipes and their details!</h3>
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
//Calories