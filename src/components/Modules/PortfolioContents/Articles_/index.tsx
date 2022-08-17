import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import databaseServices from "../../../../services/databaseServices";
import { TArticle } from "../../../../Types";
import DataNotFound from "../../DataNotFound";
import { VSearch } from "../../__vectors";
import ArticleCard from "./ArticleCard";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import ShowWidget from "../../ShowWidget";
import { v4 as uuid } from "uuid";

const mdParser = new MarkdownIt();
const toDay = new Date();
const weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

const Articles = () => {
  const [articles, setArticles] = useState<TArticle[]>([]);
  const [isEditor, setIsEditor] = useState(false);
  const [articleData, setArticleData] = useState<TArticle>({
    id: "",
    title: "",
    cover: "",
    content: "",
    date: "",
    time: "",
    author: "",
    readTime: "",
    presentation: "",
  });

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      databaseServices.getData("articles", (data: TArticle[]) => {
        setArticles(data);
      });
    })();
  }, []);

  useEffect(() => {
    setArticleData({
      ...articleData,
      id: uuid(),
      date: `${toDay.getMonth()}/${
        weekday[toDay.getDay()]
      }/${toDay.getFullYear()}`,
      time: `${toDay.getHours()} : ${toDay.getMinutes()}`,
    });
  }, []);

  const handleEditorChange = ({ text }: any) => {
    setArticleData({ ...articleData, content: text });
  };

  const onCoverChange = (e: any) => {
    const file = e.target.files[0];

    const handleError = (err: any) => {
      if (err) throw err;
    };

    const getUrl = (url: string | undefined) => {
      setArticleData({ ...articleData, cover: url! });
      return url;
    };

    databaseServices.uploadFile(file, handleError, getUrl);
  };

  const onPublishArticle = async (e: any) => {
    e.preventDefault();
    const response = await databaseServices.addNewArticle(articleData);

    if (response.error) {
      window.alert("Error found when trying to upload the article , try later");
    } else {
      window.alert(response.message);

      setArticleData({
        id: "",
        title: "",
        cover: "",
        content: "",
        date: "",
        time: "",
        author: "",
        readTime: "",
        presentation: "",
      });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-6 items-center">
        <button
          onClick={() => setIsEditor(!isEditor)}
          className={`${
            isEditor
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } hover:scale-105 transition-all text-white px-10 py-2 rounded-md`}
        >
          {isEditor ? "Fermer l'editeur" : "Nouvel article"}
        </button>
        <ShowWidget condition={isEditor}>
          <button
            onClick={() => ref.current?.click()}
            className=" bg-teal-500 hover:bg-teal-600 hover:scale-105 transition-all px-5 py-2 rounded-md text-white"
          >
            Choisir le Cover
          </button>
          <ShowWidget
            condition={
              articleData.time !== "" &&
              articleData.author !== "" &&
              articleData.content !== "" &&
              articleData.cover !== "" &&
              articleData.date !== "" &&
              articleData.title !== ""
            }
          >
            <button
              onClick={onPublishArticle}
              className=" bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all px-5 py-2 rounded-md text-white"
            >
              Post
            </button>
          </ShowWidget>
        </ShowWidget>

        <input
          ref={ref}
          type="file"
          accept="image/*"
          hidden
          onChange={onCoverChange}
        />
        <div className="flex gap-2 items-center border py-2 px-2 rounded-md">
          <VSearch />
          <input
            type="text"
            placeholder="search"
            className="bg-transparent outline-none"
          />
        </div>
      </div>
      <ShowWidget condition={!isEditor}>
        <div className="flex flex-col gap-5">
          {articles.length ? (
            articles.map((article, index) => {
              return (
                <div key={index} className="snap-center w-full">
                  <ArticleCard article={article} />
                </div>
              );
            })
          ) : (
            <DataNotFound contentTitle="Articles" />
          )}
        </div>
      </ShowWidget>
      <ShowWidget condition={isEditor}>
        <div className="flex flex-col gap-5">
          <ShowWidget condition={articleData.cover !== ""}>
            <img
              src={articleData.cover}
              alt="cover"
              className="w-1/2 h-96 object-cover"
            />
          </ShowWidget>
          <input
            type="text"
            placeholder="article title"
            className="bg-transparent outline-none p-2 border rounded-md"
            onChange={(e) =>
              setArticleData({ ...articleData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="article author"
            className="bg-transparent outline-none p-2 border rounded-md"
            onChange={(e) =>
              setArticleData({ ...articleData, author: e.target.value })
            }
          />
        </div>
        <MdEditor
          className="w-full mt-4 mr-5 h-screen"
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </ShowWidget>
    </div>
  );
};

export default Articles;
