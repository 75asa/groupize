import db from "./firestore";
import { nanoid } from "nanoid";
import { userDoc } from "../types/common";

export const putGroup = async (
  groupName: string,
  groupMember: Array<string>
): Promise<any> => {
  let groupRef = await db.collection("group");
  const _id = nanoid();
  const resGroupRef = await groupRef.doc(_id).set({
    _id,
    name: groupName,
    member: groupMember,
  });
  let userRef = await db.collection("users");
  const getUserDoc = (user: string): Promise<[boolean, userDoc]> => {
    return new Promise<[boolean, userDoc]>((resolve, reject) => {
      userRef
        .doc(user)
        .get()
        .then(doc => {
          if (!doc.exists) {
            console.log("No such document!", { doc });
            resolve([false, { slack_id: user, group_list: [_id] }]);
          } else {
            console.log("Document data:", { doc });
            resolve([true, doc.data() as userDoc]);
          }
        })
        .catch(err => {
          console.log("Error getting document", { err });
          reject(err);
        });
    });
  };

  const storedUsersRef = await Promise.all(
    groupMember.map(async user => {
      console.log({ user });
      return await getUserDoc(user);
    })
  );
  const upsertUsersRef = await Promise.all(
    storedUsersRef.map(async storeUserResult => {
      return new Promise<any>((resolve, reject) => {
        console.log({ storeUserResult });
        if (storeUserResult[0]) {
          userRef
            .doc(storeUserResult[1].slack_id)
            .set(
              {
                slack_id: storeUserResult[1].slack_id,
                group_list: [...new Set(
                  storeUserResult[1].group_list.concat([_id])
                )],
              },
              { merge: true }
            )
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject(err);
            });
        } else {
          userRef
            .doc(storeUserResult[1].slack_id)
            .set(storeUserResult[1])
            .then(result => {
              resolve(result);
            })
            .catch(err => {
              reject(err);
            });
        }
      });
    })
  );
  return { resGroupRef, storedUsersRef, upsertUsersRef };
};
