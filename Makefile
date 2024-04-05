IMAGE=my/front
CONTAINER=front-test

build:
	docker build -t ${IMAGE} .

run:
	sudo docker run --name ${CONTAINER} --network="host" -p 3000:3000 ${IMAGE}

test:
	npm test

hello:
	echo "hello"