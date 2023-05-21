import axios from "axios";

export const getMoreDetailsComments = async (serviceProviderId) => {
    try {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/api/commentServiceProvider/getByID?serviceProviderId='+serviceProviderId,
            headers: { }
        };

        const response = await axios.request(config)

        if (response.data.returnCode === "0") {
            console.log('comment list ' + response.data.commentList[0].serviceProviderId)
            return response.data.commentList
        } else {
            console.log(response.data);
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const addMoreDetailsComment = async (data) => {

    try {
        let jsonData = JSON.stringify(data);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8080/api/commentServiceProvider/add',
            headers: {
                'Content-Type': 'application/json'
            },
            data : jsonData
        };

        const response = await axios.request(config)

        if (response.data.returnCode === "0") {
            return true;
        } else {
            console.log(response.data);
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}