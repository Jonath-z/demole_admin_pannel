import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";
import {
  getDatabase,
  ref,
  set,
  remove,
  update,
  onValue,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
  StorageReference,
} from "firebase/storage";
import { TArticle, TFeedback, TService } from "../Types";
import { Unsubscribe } from "@firebase/util";

class DatabaseServices {
  public readonly realtimeDb;
  private readonly storageDb;
  constructor() {
    const app = initializeApp(firebaseConfig);
    this.realtimeDb = getDatabase(app);
    this.storageDb = getStorage(app);
  }

  async addNewService(service: TService) {
    try {
      await set(ref(this.realtimeDb, "services/" + service.id), service);
      return {
        message: "service added",
        error: null,
      };
    } catch (err) {
      return {
        message: "service not added",
        error: err,
      };
    }
  }

  async addNewArticle(article: TArticle) {
    try {
      await set(ref(this.realtimeDb, "articles/" + article.id), article);
      return {
        message: "article added",
        error: null,
      };
    } catch (err) {
      return {
        message: "article not added",
        error: err,
      };
    }
  }

  async addFeedback(feedback: TFeedback) {
    try {
      await set(ref(this.realtimeDb, "feedbacks/" + feedback.id), feedback);
      return {
        message: "feedback added",
        error: null,
      };
    } catch (err) {
      return {
        message: "feedback not added",
        error: err,
      };
    }
  }

  async deleteData(
    serviceId: string,
    folder: "articles" | "services" | "feebacks"
  ) {
    try {
      await remove(ref(this.realtimeDb, `${folder}/` + serviceId));

      return {
        error: null,
        deleted: true,
      };
    } catch (err) {
      console.log("err", err);
      return {
        error: err,
        deleted: false,
      };
    }
  }

  async updatedArticle(newArticle: TArticle) {
    try {
      update(ref(this.realtimeDb, "articles/" + newArticle.id), newArticle);
      return {
        message: "successfully updated",
        error: null,
      };
    } catch (err) {
      console.log("err", err);
      return {
        message: "failed to updated",
        error: err,
      };
    }
  }

  async getData(folder: "articles" | "services" | "feebacks", callBack: any) {
    return onValue(ref(this.realtimeDb, `${folder}/`), (snapshot) => {
      callBack(Object.values(snapshot.val()));
    });
  }

  async uploadFile(
    file: File,
    handleError: ((a: StorageError) => unknown) | null | undefined,
    getUrl: (url: string | undefined) => string | undefined
  ) {
    const imageRef = storageRef(this.storageDb, "covers/" + file.name);

    const uploadFile = uploadBytesResumable(imageRef, file);

    uploadFile.on(
      "state_changed",
      () => null,
      handleError,
      async () => {
        const url = await getDownloadURL(uploadFile.snapshot.ref);

        getUrl(url);
      }
    );
  }
}

const databaseServices = new DatabaseServices();

export default databaseServices;
