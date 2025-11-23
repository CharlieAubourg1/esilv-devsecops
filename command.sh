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
