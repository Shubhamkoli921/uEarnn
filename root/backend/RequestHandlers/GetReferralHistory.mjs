import ReferralHistory from "../Models/ReferralHistory.mjs";
import User from "../Models/User.mjs";

async function GetReferredUserData(referralRecord) {
  return new Promise((resolve, reject) => {
    User.findById(referralRecord["referred_user_id"], "-_id f_name l_name")
      .lean()
      .then((referredUserData) => {
        resolve(referredUserData);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getReferralRecords(userId, offset, limit) {
  return new Promise((resolve, reject) => {
    ReferralHistory.find(
      { referrer_user_id: userId },
      "-_id referred_user_id reward_amount created_at",
      { sort: { created_at: 1 } }
    )
      .skip(offset)
      .limit(limit)
      .then(async (referralRecords) => {
        resolve(referralRecords);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default function GetReferralHistory(req, res) {
  const userId = req["uid"];
  const offset = Number(req.query["offset"]) || 0;
  const limit = Number(req.query["limit"]) || 15;

  try {
    getReferralRecords(userId, offset, limit)
      .then(async (referralRecords) => {
        return await Promise.all(
          referralRecords.map(async (referralRecord) => {
            return {
              ...(await GetReferredUserData(referralRecord)),
              reward_amount: referralRecord["reward_amount"],
            };
          })
        );
      })
      .then(async (data) => {
        res.json({ success: true, data: data });
      });
  } catch (error) {
    console.log(error);
    //TODO response with precise status code later
    res.status(404).json({ success: false, data: null });
  }
}
