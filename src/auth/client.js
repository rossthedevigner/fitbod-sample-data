import { API_URL, GET_USER, GET_USERS } from '../utils/constants';
import { api } from '../utils/fitbod-api-service';

const localStorageKey = '__fitbod:user__';

// function handleUserResponse({ user: { token, ...user } }) {
//   window.localStorage.setItem(localStorageKey, token);
//   return user;
// }

function setLocalUser({ token }) {
  window.localStorage.setItem(localStorageKey, token);
}

async function login({ username, password }) {
  try {
    return await findUser({ username, password });
  } catch (e) {
    console.log(e);
    return Promise.reject(e);
  }
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
  return Promise.resolve();
}

async function findUser({ ...body }) {
  setLocalUser(authenticate(body));

  try {
    const userList = await api(`${GET_USERS}.json`, {
      body
    });
    const user = userList.find((user) => user.email === body.username);

    if (!user) {
      return Promise.reject({ message: 'No user found!' });
    }
    return Promise.resolve(user);
  } catch (e) {
    return Promise.reject({ message: 'Invalid username or password.' });
  }
}

async function getAllUserWorkoutsData(user) {
  const [workouts, exercises] = await Promise.all([
    getAllUserWorkouts(user.id),
    getAllExercises()
  ])
    .then(async ([workouts, exercises]) => {
      const sets = await getAllUserWorkoutsSingleSets(
        user.id,
        workouts,
        exercises
      );
      return [workouts, sets];
    })
    // .then(([workouts, exercises, sets]) => {
    //   return Promise.resolve([
    //     mapExercisesToWorkouts(exercises, workouts, sets),
    //     sets
    //   ]);
    // })
    .catch((e) => {
      return Promise.reject({ message: 'Error retrieving workouts' });
    });

  return await { workouts, exercises };
}

async function getAllUserWorkouts(userID) {
  return await api(`api/v1/users/${userID}/workouts.json`);
}

async function getAllExercises() {
  return await api(`api/v1/exercises.json`);
}

async function getAllUserWorkoutsSingleSets(userID, workouts, exercises) {
  if (!userID) {
    return Promise.reject({ message: 'Missing either userID.' });
  }

  return await Promise.all(
    workouts.map((workout) => {
      return api(
        `api/v1/users/${userID}/workouts/${workout.id}/single_sets.json`
      );
    })
  )
    .then((sets) => {
      return Promise.resolve(mapSetsToExercise(sets, exercises));
    })
    .catch((e) => {
      return Promise.reject({ message: 'Cannot find matching single sets.' });
    });
}

async function getUserSingleSets(userID, workout, exercises) {
  if (!userID) {
    return Promise.reject(new Error('Missing either userID.'));
  }

  return api(`api/v1/users/${userID}/workouts/${workout.id}/single_sets.json`)
    .then((sets) => {
      return Promise.resolve(mapSetsToExercise(sets, workout, exercises));
    })
    .catch((e) => {
      return Promise.reject({ message: 'Cannot find matching sets.' });
    });
}

function mapSetsToExercise(sets, exercises) {
  const newEx = [...exercises];
  return exercises
    .map((exercise, idx) =>
      sets.map((set) =>
        set.filter((ex, index) => ex.exercise_id === exercise.id)
      )
    )
    .reduce((acc, curr, idx) => {
      if (!curr.length) {
        return acc;
      }

      acc[idx].totalSets = acc[idx].totalSets || [];
      acc[idx].totalSets.push(...curr.flat());

      return acc;
    }, newEx)
    .filter((item, idx) => {
      if (item.totalSets) {
        return item.totalSets.sort((a, b) => a.id - b.id);
      }
    })
    .sort((a, b) => a.id - b.id);
}

function getExerciseNameFromID(set, exercise) {}

function authenticate({ username, password }) {
  try {
    return { token: btoa(`${username}:${password}`) };
  } catch (e) {
    throw new Error({ message: 'Invalid username.' });
  }
}

export {
  login,
  logout,
  authenticate,
  getAllUserWorkoutsData,
  getUserSingleSets
};
