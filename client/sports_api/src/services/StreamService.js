import API from '@/services/API'

export default {

        getGamesByUser (userId) {
            return API().post('gamesByUser', userId);          //post method of Axios module. 
    },
       post (stream, sport) {
            return API().post('sports', stream, sport);
        },
        getFeed (stream) {
            return API().post('scores', stream);
        },
        drop (projectId) {
            return API().put('drop', projectId);
        },
        addMember (projectId, userId) {
            return API().put('addTeamMember', projectId, userId);
        },
        removeMember (projectId, userId) {
            return API().put('removeMember', projectId, userId);
        },
        getTeam (projectId) {
            return API().post('getProjectTeam', projectId);
        },
        search (userId, query) {
            return API().put('search', userId, query);
        },
        postCard (projectId, title, description, deadline, userId, owner, board) {
            return API().post('newCard', projectId, title, description, deadline, userId, owner, board);
        }
}


