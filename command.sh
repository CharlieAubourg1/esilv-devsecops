kubectl
ls
git branch
git checkout -b alex_in_the_cloud  
kubectl apply -f deployment-db.yaml
kubectl config current-context
kubectl apply -f service-db.yaml
kubectl get pods
kubectl get pvc
kubectl get svc
kubectl exec -it mysql-pod -- mysql -u root -p
kubectl cp db/init.sql mysql-pod:/init.sql
kubectl exec -it mysql-pod -- bash
mysql -u root -p < /init.sql
kubectl exec -it mysql-pod -- mysql -u root -p
kubectl apply -f deployment-app.yaml
kubectl apply -f app/service-app.yaml
kubectl get pods
kubectl get svc bakery-api-service
kubectl exec -it bakery-api-7765797c55-7jfmk --bash
kubectl delete pod bakery-api-7765797c55-7jfmk
kubectl apply -f app/deployment-app.yaml
cd app
docker images
kubectl apply -f deployment-app.yaml
kubectl apply -f deployment-app.yaml
kubectl get pods
kubectl get pods
kubectl get deployments
kubectl scale deployment bakery-api --replicas=0
kubectl scale deployment bakery-api --replicas=1 # restart frontend
kubectl delete pod mysql-pod
kubectl get pods
docker build -t my-mysql .
docker images
kubectl apply -f deployment-db.yaml #recreate pod mysql
kubectl get pods
cd 
minikube image load my-mysql:latest #error
kubectl delete pod mysql-pod #clean error
kubectl get pods # clean error 
#create new container mysql with pod 
docker build -t my-mysql . 
docker volume create mysql-data #data are now save here
docker stop mysql-container
docker rm mysql-container #wrong idea
kubectl get pods
kubectl get pods #searche something 
# command to sucess running after configuration
kubectl apply -f deployment-db.yaml    
# try connection pod 
kubectl exec -it bakery-api-6f746b586f-ts9bs -- sh #nothing 
#faile mysql not found 
# apply change 
kubectl apply -f app/deployment-app.yaml
# destroy again pod 
kubectl delete pod mysql-pod
# next step
kubectl apply -f deployment-db.yaml #recreate pod mysql