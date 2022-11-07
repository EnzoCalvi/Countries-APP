import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Countries.module.css";
import CountryCard from "views/Home/CountryCard/CountryCard";
import NavBar from "../NavBar/NavBar";
import Header from "../Header/Header";

export default function Countries() {
  const countries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(0);
  const load = useSelector((state) => state.loading);
  const [loading, setLoading] = useState(false);

  let firstPage = () => {
    setCurrentPage(0);
  };

  let nextPage = () => {
    if (countries.length <= currentPage + 10) {
      setCurrentPage(currentPage);
    } else setCurrentPage(currentPage + 10);
  };

  let previousPage = () => {
    if (currentPage < 10) {
      setCurrentPage(0);
    } else setCurrentPage(currentPage - 10);
  };

  let selectPage = (event) => {
    setCurrentPage(parseInt(event.target.value));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [load]);

  useEffect(() => {
    firstPage();
  }, [countries]);

  const showCountries =
    currentPage === 0
      ? countries.slice(currentPage, currentPage + 9)
      : countries.slice(currentPage, currentPage + 10);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        {loading === true ? (
          <div className={styles.ldsroller}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          showCountries.map((country) => {
            return (
              <Link
                to={`/main/${country.id}`}
                key={country.id}
                className={styles.link}
              >
                <CountryCard
                  name={country.name}
                  flag={country.flag}
                  continent={country.continent}
                />
              </Link>
            );
          })
        )}
        <NavBar
          length={Math.ceil(countries.length / 10)}
          set={selectPage}
          prev={previousPage}
          next={nextPage}
        />
      </div>
    </div>
  );
}
