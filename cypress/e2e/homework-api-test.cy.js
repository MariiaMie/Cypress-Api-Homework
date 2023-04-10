describe("httpbin tests", () => {
	// Test 1 ----------
	it("POST new game", () => {
		const newGame = {
			game: "Assasin's Creed",
		};

		cy.request({
			method: "POST",
			url: "https://httpbin.org/post",
			body: newGame,
			failOnStatusCode: false,
		}).as("details");
		cy.get("@details").then((response) => {
			assert.equal(200, response.status);
			assert.notStrictEqual(newGame, response.body);
		});
	});

	// Test 2 ----------
	it("Method GET", () => {
		cy.request({
			method: "GET",
			url: "https://httpbin.org/get",
			failOnStatusCode: true,
		}).as("details");
		cy.get("@details").then((response) => {
			assert.equal(200, response.status);
		});
	});

	// Test 3 ----------
	it("Wrong request, response should be 405", () => {
		cy.request({
			method: "GET",
			url: "https://httpbin.org/post",
			failOnStatusCode: false,
		}).as("details");
		cy.get("@details").then((response) => {
			assert.equal(405, response.status);
		});
	});
	// Test 4 ----------
	it("Passing a query parameter about the game", () => {
		const request = {
			url: "https://httpbin.org/get",
			qs: {
				game: "Assasin's Creed",
			},
			failOnStatusCode: false,
		};

		cy.request(request).then((response) => {
			assert.equal("Assasin's Creed", response.body.args.game);
		});
	});

	// Test 5 ----------
	it("Passing a query parameter about name", () => {
		const request = {
			url: "https://httpbin.org/get",
			qs: {
				name: "Rachel",
			},
			failOnStatusCode: false,
		};

		cy.request(request).then((response) => {
			assert.equal("Rachel", response.body.args.name);
		});
	});

	// Test 6 ----------
	it("Test Duration", () => {
		const request = {
			method: "POST",
			url: "https://httpbin.org/post",
			failOnStatusCode: true,
		};
		cy.request(request).then((response) => {
			assert.isTrue(response.duration <= 550);
		});
	});
	// Test 7 ----------
	it("Test that header DATE set correctly", () => {
		cy.request({
			method: "GET",
			url: "https://httpbin.org/headers",
			headers: {
				date: "Mon, 10 Apr 2023",
			},
			failOnStatusCode: false,
		}).as("details");

		cy.get("@details").then((response) => {
			assert.equal(200, response.status);
			assert.equal("Mon, 10 Apr 2023", response.requestHeaders.date);
		});
	});
	// Test 8 ----------
	it("Using UserAgent", () => {
		cy.request({
			method: "GET",
			url: "https://httpbin.org/headers",
			headers: {
				"user-agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/97.0.0.0",
			},
			failOnStatusCode: false,
		}).as("details");
		cy.get("@details").then((response) => {
			assert.equal(200, response.status);
			assert.equal(
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/97.0.0.0",
				response.requestHeaders["user-agent"]
			);
		});
	});
	// Test 9 ----------
	it("Returns cookie data", () => {
		cy.request({
			method: "GET",
			url: "https://httpbin.org/cookies",
			headers: {
				Cookie: "e-mail=mail@mail.com",
			},
			failOnStatusCode: false,
		}).as("details");
		cy.get("@details").then((response) => {
			assert.equal(200, response.status);
			assert.equal(
				"e-mail=mail@mail.com",
				response.requestHeaders["Cookie"]
			);
		});
	});
	// Test 10 ----------
	it("Returns the requester's IP Address.", () => {
		cy.request({
			method: "GET",
			url: "https://httpbin.org/ip",
			headers: {
				origin: "77.255.29.157",
			},
			failOnStatusCode: false,
		}).as("details");
		cy.get("@details").then((response) => {
			assert.equal(200, response.status);
			assert.equal("77.255.29.157", response.requestHeaders.origin);
		});
	});
});
