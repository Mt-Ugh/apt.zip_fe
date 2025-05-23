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

        // ← 기존 'Vue Build' 와 이름이 겹치지 않도록 변경
        stage('Install & Build Vue') {
            steps {
                script {
                    docker.image('node:18').inside("-u root:root -v ${WORKSPACE}/.env:/app/.env -w /app") {
                        sh '''
                            echo "== /app 디렉토리 파일 목록 =="
                            ls -al /app

                            echo "== 컨테이너 내 .env 내용 =="
                            cat /app/.env

                            npm ci --prefer-offline --no-audit
                            npm run build -- --mode production
                        '''
                    }
                }
            }
        }

        stage('Send Files to Remote') {
            steps {
                sh """
                    ssh ${REMOTE_USER}@${REMOTE_HOST} 'mkdir -p ${REMOTE_PATH}'
                    scp -r dist ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/dist
                    scp Dockerfile ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/Dockerfile
                    scp nginx.conf ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/nginx.conf
                """
            }
        }

        stage('Remote Docker Build & Run') {
            steps {
                sh """
                    ssh ${REMOTE_USER}@${REMOTE_HOST} '
                        cd ${REMOTE_PATH} &&
                        docker stop ${APP_NAME} || true &&
                        docker rm ${APP_NAME}  || true &&
                        docker build -t ${APP_NAME} . &&
                        docker run -d --name ${APP_NAME} -p 3000:80 ${APP_NAME}
                    '
                """
            }
        }
    }
}
