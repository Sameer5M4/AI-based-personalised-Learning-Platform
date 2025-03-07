let skillsData = [];

        (async () => { 
            try {
                const response = await fetch("./DataSet.csv");
                if (!response.ok) throw new Error("Failed to load file");

                const data = await response.text();
                skillsData = data.split("\n").map(skill => skill.trim()).filter(skill => skill);
                // console.log("Loaded Skills:", skillsData);
            } catch (error) {
                console.error("Error:", error);
            }
        })();

        function filterResults() {
            const query = document.getElementById("searchBox").value.toLowerCase();
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";
            resultsDiv.classList.add("hidden");

            if (query.length === 0) return;

            const filtered = skillsData
                .filter(skill => skill.toLowerCase().includes(query))
                .sort((a, b) => a.toLowerCase().indexOf(query) - b.toLowerCase().indexOf(query)) // Prioritize closer matches
                .slice(0, 6); // Limit to 6 suggestions

            if (filtered.length === 0) return;

            resultsDiv.classList.remove("hidden");
            filtered.forEach(skill => {
                const div = document.createElement("div");
                div.className = "p-3 hover:bg-blue-100 cursor-pointer flex items-center gap-2 border-b";
                div.innerHTML = `<span class="text-gray-600">🔍</span> ${skill}`;
                div.onclick = () => selectSkill(skill);
                resultsDiv.appendChild(div);
            });
        }

        function selectSkill(skill) {
            document.getElementById("searchBox").value = skill;
            document.getElementById("results").classList.add("hidden");
        }