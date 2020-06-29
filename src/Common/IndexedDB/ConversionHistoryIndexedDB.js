import { openDB } from "idb";

const DATABASE_NAME = "Currency";
const TABLE_NAME = "ConversionHistory";

const Connect = () => {
  return openDB(DATABASE_NAME, 1, {
    upgrade(database, oldVersion) {
      if (oldVersion === 0) {
        const store = database.createObjectStore(TABLE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("date", "date", { unique: false });
        store.createIndex("entryValue", "entryValue", { unique: false });
        store.createIndex("resultValue", "resultValue", { unique: false });
      }
    },
  });
};

/**
 *
 * @param {Function} successFunc
 * @param {Function} errorFunc
 * @returns {Promise<void>}
 * @constructor
 */
export async function GetEntries(successFunc, errorFunc) {
  Connect()
    .then((database) => {
      database
        .getAll(TABLE_NAME)
        .then((value) => {
          successFunc(value);
        })
        .catch((Error) => {
          errorFunc(Error);
        });
    })
    .catch((Error) => {
      errorFunc(Error);
    });
}

/**
 * @param {string} date
 * @param {string} entryValue
 * @param {string} resultValue
 * @param {Function} successFunc
 * @param {Function} errorFunc
 * @returns {Promise<void>}
 * @constructor
 */
export async function AddEntry(
  { date, entryValue, resultValue },
  successFunc,
  errorFunc
) {
  Connect()
    .then((database) => {
      database
        .add(TABLE_NAME, { date, entryValue, resultValue })
        .then(() => {
          GetEntries(successFunc, errorFunc);
        })
        .catch((Error) => {
          errorFunc(Error);
        });
    })
    .catch((Error) => {
      errorFunc(Error);
    });
}

/**
 * @param {Function} successFunc
 * @param {Function} errorFunc
 * @returns {Promise<void>}
 * @constructor
 */
export async function Clear(successFunc, errorFunc) {
  Connect()
    .then((database) => {
      database
        .clear(TABLE_NAME)
        .then(() => {
          GetEntries(successFunc, errorFunc);
        })
        .catch((Error) => {
          errorFunc(Error);
        });
    })
    .catch((Error) => {
      errorFunc(Error);
    });
}
