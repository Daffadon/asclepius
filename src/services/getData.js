const { Firestore } = require("@google-cloud/firestore");

const getData = async () => {
  try {
    const db = new Firestore();
    const predictCollection = db.collection("predictions");
    const snapshot = await predictCollection.get();
    const result = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        result: data.result,
        createdAt: data.createdAt,
        suggestion: data.suggestion,
        id: data.id,
      };
    });
    return result;
  } catch {}
};

module.exports = getData;
