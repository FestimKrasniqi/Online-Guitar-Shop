
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_UNIQUE_MODEL } from "../queries";
import type { Model } from "../types";
import { useParams, Link, useLocation } from "react-router-dom";
import "./ModelDetails.css";
import Footer from "../components/footer";
import { useLanguage} from "../context/LanguageContext";
 import { translations } from "../translations";

export default function ModelDetails() {
  const { guitarId } = useParams<{ guitarId: string }>();
  const location = useLocation();
  const brandId = location.state?.brandId;
  const {language} = useLanguage();
  const t = translations[language];

  const { data, loading, error } = useQuery<{ findUniqueModel: Model }>(
    GET_UNIQUE_MODEL,
    {
      variables: { brandId, modelId: guitarId },
      skip: !brandId || !guitarId,
    }
  );

  const [activeTab, setActiveTab] = useState<"specs" | "musicians">("specs");
  const [musiciansToShow, setMusiciansToShow] = useState(2);

  if (!brandId) return <p>{t.error}: {t.missingBrandId}.</p>;
 if (loading) return <p>{t.loading}</p>;
 if (error)
   return (
     <p>
       {t.error} {error.message}
     </p>
   );

  const model = data?.findUniqueModel;
  if (!model) return <p>Model not found.</p>;

  const loadMoreMusicians = () => setMusiciansToShow((prev) => prev + 2);

  return (
    <>
      <div className="model-details-container">
        <Link to={`/brands/${brandId}`} className="back-button">
          &larr; {t.backToModels}
        </Link>

        {/* Header */}
        <div className="model-header">
          <img src={model.image} alt={model.name} className="model-image" />
          <div className="model-info">
            <h1>{model.name}</h1>
            <p>
              {t.type}: {model.type}
            </p>
            <p>
              {t.price}: ${model.price}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === "specs" ? "active" : ""}
            onClick={() => setActiveTab("specs")}
          >
            {t.specs}
          </button>
          <button
            className={activeTab === "musicians" ? "active" : ""}
            onClick={() => setActiveTab("musicians")}
          >
            {t.musicians}
          </button>
        </div>

        {/* Specs Tab */}
        {activeTab === "specs" && model.specs && (
          <div className="specs">
            <h2>{t.specifications}</h2>
            <ul>
              {Object.entries(model.specs).map(([key, value]) => (
                <li key={key}>
                  <strong>
                    {t.specsLabels[key as keyof typeof t.specsLabels] ?? key}:
                  </strong>{" "}
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Musicians Tab */}
        {activeTab === "musicians" && model.musicians && (
          <div className="musicians">
            <h2>{t.musicians}</h2>
            <ul>
              {model.musicians
                .slice(0, musiciansToShow)
                .map((musician, index) => (
                  <li key={index}>
                    <img
                      src={musician.musicianImage}
                      alt={musician.name}
                      className="musician-image"
                    />
                    <div>
                      <h3>{musician.name}</h3>
                      <p>Bands: {musician.bands.join(", ")}</p>
                    </div>
                  </li>
                ))}
            </ul>
            {musiciansToShow < model.musicians.length && (
              <button className="load-more" onClick={loadMoreMusicians}>
                {t.loadMore}
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

// Helper to format spec labels nicely
function formatSpecLabel(label: string): string {
  return label
    .replace(/([A-Z])/g, " $1") // split camelCase
    .replace(/^./, (str) => str.toUpperCase()); // capitalize
}
