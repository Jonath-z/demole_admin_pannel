import React from "react";
import { VMail, VPhone } from "../__vectors";

const PortfolioDetails = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5 bg-white p-5 rounded-lg shadow-xl">
        <h2 className="font-bold text-2xl border-b py-2">Slogant</h2>
        <p>Je suis un freelance copywriter et createur des contenus web</p>
      </div>
      <div className="flex flex-col gap-5 bg-white p-5 rounded-lg shadow-xl">
        <h2 className="font-bold text-2xl border-b py-2">A propos de moi</h2>
        <p>
          Fin passionné de la psychologie humaine, je me suis plongé dans cette
          grande marmite entrepreneuriale et précisément dans le copywriting vu
          que celui-ci partage plusieurs de mes valeurs intrinsèques, entre
          autre l&apos;empathie.
          <br />
          <br /> Mettre l&apos;humain et ses besoins au cœur d&apos;un business
          fait qu&apos;il y ai un business.
          <br /> Je suis détenteur d&apos;un diplôme en Sciences Économiques et
          Gestion et d&apos;un Baccalauréat en Finance.
          <br />
          <br /> J&apos;aide les entrepreneurs et infopreneurs à augmenter leurs
          ventes et la conversion de leurs leads grâce à des textes hypnotiques
          et persuasifs pour exploser tes résultats en quittant du normal à
          éblouissant.
        </p>
      </div>
      <div className="flex flex-col gap-5 bg-white rounded-lg shadow-xl p-5">
        <h2 className="text-2xl font-bold border-b py-2">Contact</h2>
        <a href="mailto:eliedemole2@gmail.com">
          <p className="flex gap-3 items-center">
            <span>
              <VMail className="text-2xl" />
            </span>
            <span>eliedemole2@gmail.com</span>
          </p>
        </a>
        <a href="tel:+250783375293">
          <p className="flex gap-3 items-center">
            <span>
              <VPhone className="text-2xl" />
            </span>
            <span>+250 783 375 293</span>
          </p>
        </a>
      </div>
    </div>
  );
};

export default PortfolioDetails;
