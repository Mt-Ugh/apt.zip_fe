pipeline {
    agent any

    environment {
        REMOTE_USER       = 'jenkins'
        REMOTE_HOST       = '192.168.35.110'
        REMOTE_PATH       = '/home/jenkins/aptzip_fe'
        APP_NAME          = 'vue-app'
        MINIO_ENDPOINT    = 'http://192.168.35.120:9000'
        MINIO_BUCKET_PATH = 'aptzip/configs/.env'
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'deploy', url: 'https://github.com/Mt-Ugh/apt.zip_fe.git'
            }
        }

        stage('Fetch .env from MinIO') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'minio-cred', usernameVariable: 'MINIO_USER', passwordVariable: 'MINIO_PASS')]) {
                    sh '''
                        curl -sO https://dl.min.io/client/mc/release/linux-amd64/mc
                        chmod +x mc
                        ./mc alias set aptminio $MINIO_ENDPOINT $MINIO_USER $MINIO_PASS
                        ./mc cp aptminio/$MINIO_BUCKET_PATH .env || (echo "❌ .env 다운로드 실패" && exit 1)
                    '''
                }
            }
        }

        stage('Transfer Source to Remote') {
            steps {
                sh """
                    echo "📤 원격 서버에 소스코드 전송 중..."
                    ssh ${REMOTE_USER}@${REMOTE_HOST} 'rm -rf ${REMOTE_PATH} && mkdir -p ${REMOTE_PATH}'
                    scp -r . ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}
                """
            }
        }

        stage('Remote Docker Build & Run') {
            steps {
                sh """
                    echo "🐳 원격 서버에서 Vue 앱 빌드 및 컨테이너 실행"
                    ssh ${REMOTE_USER}@${REMOTE_HOST} '
                        cd ${REMOTE_PATH} &&
                        docker stop ${APP_NAME} || true &&
                        docker rm ${APP_NAME} || true &&
                        docker build --no-cache -t ${APP_NAME} . &&
                        docker run -d --name ${APP_NAME} -p 3000:80 ${APP_NAME}
                    '
                """
            }
        }
    }

    post {
        failure {
            echo "❌ 배포 실패"
        }
        success {
            echo "✅ 배포 성공! http://${REMOTE_HOST}:3000"
        }
    }
}
