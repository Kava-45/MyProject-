  import { Link } from "react-router";

  const Body_container = () =>{
      return(
          <>
          <h2 className="categories-title">Популярные товары для авто</h2>
        <div className="categories-list">
          <div className="category-box">
            <h3><i className="fas fa-oil-can"></i> Моторное масло</h3>
            <Link to="/cards_1" className="under_the_text">Синтетическое</Link>
            <Link to="/cards_2" className="under_the_text">Полусинтетическое</Link>
            <Link to="/cards_3"className="under_the_text">Минеральное</Link>
          </div>

          <div className="category-box">
            <h3><i className="fas fa-bolt"></i> Свечи зажигания</h3>
            <Link to="/cards_4" className="under_the_text">Обычные </Link>
            <Link to="/cards_5" className="under_the_text">Иридий / Платина</Link>
          </div>

          <div className="category-box">
            <h3><i className="fas fa-wind"></i> Щетки стеклоочистителя</h3>
            <Link to="/cards_6" className="under_the_text">Одиночные</Link>
            <Link to="/cards_7" className="under_the_text">Комплекты</Link>
          </div>

          <div className="category-box">
            <h3><i className="fas fa-lightbulb"></i> Автолампы</h3>
            <Link to="/cards_8" className="under_the_text">Головной свет</Link>
            <Link to="/cards_9" className="under_the_text">Габаритные</Link>
            <Link to="/cards_10" className="under_the_text">Ксенон</Link>
            <Link to="/cards_11" className="under_the_text">Светодиодные</Link>
          </div>

          <div className="category-box">
            <h3><i className="fas fa-oil-can"></i> Масло трансмиссионное</h3>
            <Link to="/cards_12" className="under_the_text">Для АКПП</Link>
            <Link to="/cards_13" className="under_the_text">Для вариаторов</Link>
            <Link to="/cards_14" className="under_the_text">Трансмиссионное</Link>
          </div>

          <div className="category-box">
            <h3><i className="fas fa-car-battery"></i> Аккумуляторы</h3>
            <Link to="/cards_15" className="under_the_text">Прямая полярность</Link>
            <Link to="/cards_16" className="under_the_text">Обратная полярность</Link>
          </div>

          <div className="category-box">
            <h3><i className="fas fa-temperature-low"></i> Антифриз</h3>
            <Link to="/cards_17" className="under_the_text">Готовый (раствор)</Link>
            <Link to="/cards_18" className="under_the_text">Концентрат</Link>
          </div>

          <div className="category-box">
            <h3><i className="fas fa-tint"></i> Гидравлическое масло</h3>
            <Link to="/cards_19" className="under_the_text">Синтетическое</Link>
            <Link to="/cards_20" className="under_the_text">Минеральное</Link>
          </div>
          <div className='category-box'>
            <h3><i className='fas fa-car'></i>Тюнинг</h3>
            <Link to="/cards_21" className="under_the_text">Марка автомобиля</Link>
          </div>
        </div>
          </>
      )
  }
  export default Body_container;