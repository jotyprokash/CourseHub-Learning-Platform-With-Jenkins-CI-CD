pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'jotyprokash/coursehub'
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')
        HELM_RELEASE_NAME = 'coursehub'
        KUBECONFIG_CREDENTIAL = credentials('k8s-config')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/jotyprokash/CourseHub-Learning-Platform-With-Jenkins-CI-CD.git'
            }
        }
        
        stage('Security: SAST & Secrets') {
            parallel {
                stage('Semgrep (SAST)') {
                    steps {
                        sh 'semgrep --config auto .'
                    }
                }
                stage('Gitleaks (Secrets)') {
                    steps {
                        sh 'gitleaks detect --source . --verbose'
                    }
                }
            }
        }
        
        stage('Code Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'npm install && npm test'
                    sh 'sonar-scanner'
                }
            }
        }
        
        stage('Build & Image Security') {
            parallel {
                stage('Build Backend') {
                    steps {
                        script {
                            sh "docker build -t ${DOCKER_IMAGE}-backend:${env.BUILD_NUMBER} ./backend"
                            sh "trivy image --severity HIGH,CRITICAL ${DOCKER_IMAGE}-backend:${env.BUILD_NUMBER}"
                        }
                    }
                }
                stage('Build Frontend') {
                    steps {
                        script {
                            sh "docker build -t ${DOCKER_IMAGE}-frontend:${env.BUILD_NUMBER} ./frontend"
                            sh "trivy image --severity HIGH,CRITICAL ${DOCKER_IMAGE}-frontend:${env.BUILD_NUMBER}"
                        }
                    }
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-credentials') {
                        sh "docker push ${DOCKER_IMAGE}-backend:${env.BUILD_NUMBER}"
                        sh "docker push ${DOCKER_IMAGE}-frontend:${env.BUILD_NUMBER}"
                        sh "docker tag ${DOCKER_IMAGE}-backend:${env.BUILD_NUMBER} ${DOCKER_IMAGE}-backend:latest"
                        sh "docker tag ${DOCKER_IMAGE}-frontend:${env.BUILD_NUMBER} ${DOCKER_IMAGE}-frontend:latest"
                        sh "docker push ${DOCKER_IMAGE}-backend:latest"
                        sh "docker push ${DOCKER_IMAGE}-frontend:latest"
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'k8s-config']) {
                    sh "helm upgrade --install ${HELM_RELEASE_NAME} ./helm/coursehub --set image.tag=${env.BUILD_NUMBER}"
                }
            }
        }
        
        stage('Security: DAST') {
            steps {
                sh "zap-baseline.py -t http://coursehub.local -r zap_report.html"
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: '.', reportFiles: 'zap_report.html', reportName: 'ZAP Security Report', reportTitles: ''])
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo "Deployment successful! Site available at http://coursehub.local"
        }
    }
}