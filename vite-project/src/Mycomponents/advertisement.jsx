import { Link } from "react-router-dom";
const Adversement = () =>{
    return(
        <>
        <section className="features-section">
        <div className="delivery-block">
          <div className="delivery-content">
            <div className="red-strip"></div>
            <h1>Доставим по всей России</h1>
            <div className="location-info">
              <i className="fas fa-map-marker-alt"></i> 
              <p>Наши склады и магазины открыты в <span className="highlight">145 городах</span> страны.</p>
            </div>
            <p className="delivery-text">
              Быстро доставим товар в любой магазин «Zapper» или пункт выдачи транспортной компании СДЭК. Скорость
              обеспечена отгрузками с локальных складов, расположенных в вашем населенном пункте.
            </p>
          </div>
          <div className="delivery-image">

            <img src="Car_logo_1.jpg" alt="Доставка по России" />
          </div>
        </div>
        
        <div className="guarantee-row">
          <div className="guarantee-item">
            <div className="guarantee-icon-wrapper">
              <i className="fas fa-award"></i>
            </div>
            <h2>Доверяйте нам</h2>
            <p>Мы заключили прямые контракты со всеми производителями, поэтому у нас вы получаете исключительно оригинальную продукцию. Ваш автомобиль заслуживает только проверенных и сертифицированных запчастей!</p>
          </div>
          <div className="guarantee-item">
            <div className="guarantee-icon-wrapper">
              <i className="fas fa-undo"></i>
            </div>
            <h2>Гарантия возврата</h2>
            <p>Если вы ошиблись с подбором запчасти или просто передумали, мы примем ее обратно в магазине, где была совершена покупка.</p>
          </div>
        </div>
      </section>
    </>
    )
}
export default Adversement;