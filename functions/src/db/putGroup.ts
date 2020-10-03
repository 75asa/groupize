import db from "./firestore";
import { nanoid } from "nanoid";
import { userDoc } from "../types/common";

export const putGroup = async (
  groupName: string,
  groupMember: Array<string>
) => {
  let groupRef = await db.collection("group");
  const _id = nanoid(); const resGroupRef = await groupRef.doc(_id).set({
    _id,
    name: groupName,
    member: groupMember,
  });

  let userRef = await db.collection("users");
  const resUserRef = await Promise.all(
    groupMember.map(async user => {
      return await new Promise<any>(async (resolve, reject) => {
        const storedUserDoc = await new Promise<[boolean, userDoc|null]>((resolve, reject) => {
          userRef.doc(user)
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.log("No such document!");
              resolve([false, null]);
            } else {
              console.log("Document data:", doc.data());
              resolve([true, doc.data() as userDoc]);
            }
          })
          .catch(err => {
            console.log("Error getting document", { err });
            reject([false, null]);
          });
        })

        console.log({ storedUserDoc });

        if (storedUserDoc[0]) {
          return userRef.doc(user).set(
            {
              slack_id: user,
              group_list: storedUserDoc[1].group_list.concat.push(_id),
            },
            { merge: true }
          );
        } else {
          return userRef.doc(user).set(
            {
              slack_id: user,
              group_list: [_id],
            },
            { merge: true }
          );
        }
      });
    })
  );
  return { resGroupRef, resUserRef };
};
